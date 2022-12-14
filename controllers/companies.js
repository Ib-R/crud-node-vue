const path = require('path');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
// const geocoder = require('../utils/geocoder');
const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/v1/companies
// @access  Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
    res.json(res.advancedResults);
});

// @desc    Create new companies
// @route   POST /api/v1/companies
// @access  Private
exports.createCompany = asyncHandler(async (req, res, next) => {
    // Link company to the user
    req.body.user = req.user.id;

    // Restrict publisher to one company
    const publishedCompany = await Company.findOne({ user: req.user.id });
    if (publishedCompany && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Publisher ${req.user.name} already have a published company`, 400));
    }

    const company = await Company.create(req.body);
    res.status(201).json({ success: true, data: company });
});

// @desc    Get single companies
// @route   GET /api/v1/companies/:id
// @access  Public
exports.getCompany = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return next(new ErrorResponse(`ID not found ${req.params.id}`, 404));
    }
    res.json({ success: true, data: company });
});

// @desc    Update new companies
// @route   PUT /api/v1/companies/:id
// @access  Private
exports.updateCompany = asyncHandler(async (req, res, next) => {
    let company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorResponse(`ID not found ${req.params.id}`, 404));
    }

    // Ownership check
    // if (company.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //     return next(new ErrorResponse(`User is not authorized to update the company`, 403));
    // }

    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.json({ success: true, data: company });
});

// @desc    Delete company
// @route   DELETE /api/v1/companies/:id
// @access  Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return next(new ErrorResponse(`ID not found ${req.params.id}`, 404));
    }

    // Ownership check
    if (company.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User is not authorized to delete the company`, 403));
    }

    company.remove();
    res.json({ success: true, data: 'Company deleted' });
});

// @desc    Upload file for company
// @route   DELETE /api/v1/companies/:id/file
// @access  Private
exports.companyFileUpload = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return next(new ErrorResponse(`ID not found ${req.params.id}`, 404));
    }

    // Ownership check
    if (company.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User is not authorized to update the company`, 403));
    }

    if (!req.files) {
        return next(new ErrorResponse('Please upload a file', 400));
    }

    const file = req.files.file;

    // Validation
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }
    if (file.size > process.env.MAX_FILE_SIZE) {
        return next(new ErrorResponse(`Please upload file less than ${process.env.MAX_FILE_SIZE / 1024 / 1024}MB`, 400));
    }

    // Custom file name
    file.name = `file_${company._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file uplaod`, 500));
        }

        await Company.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.json({ success: true, data: file.name });
    });
});

// @desc    GET companies within radius
// @route   GET /api/v1/companies/radius/:coords/:distance
// @access  Private
exports.getCompaniesInRadius = asyncHandler(async (req, res, next) => {
    const { coords, distance } = req.params;
    const coordsArr = coords.split(',');
    const lat = coordsArr[0];
    const lng = coordsArr[1];

    // Calc radius using radians
    // By dividing dist by radius of Earth
    // Earth radius = 3,963 mi or 6,378 km
    const radius = distance / 6378;

    const companies = await Company.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.json({ success: true, count: companies.length, data: companies });
});

// @desc    GET companies within radius with Zipcode
// @route   GET /api/v1/companies/radius/:zipcode/:distance
// @access  Private
// exports.getCompaniesInRadius = asyncHandler(async (req, res, next) => {
//     const { zipcode, distance } = req.params;

//     // Get lat/lng from geocode
//     const loc = await geocoder.geocode(zipcode);
//     const lat = 29.908118;
//     const lng = 31.287130;

//     // Calc radius using radians
//     // By dividing dist by radius of Earth
//     // Earth radius = 3,963 mi or 6,378 km
//     const radius = distance / 6378;

//     const companies = await Company.find({
//         location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
//     });

//     res.json({ success: true, count: companies.length, data: companies });
// });