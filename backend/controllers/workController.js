const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Work = require("../models/workModel");
const EmpProfile = require("../models/empProfileModel");

// @desc    Get user works
// @route   GET /api/works
// @access  Private
const getWorks = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const works = await Work.find({ user: req.user.id });

  res.status(200).json(works);
});

// @desc    Get user works
// @route   GET /api/works/:id
// @access  Private
const getWork = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found or not conected");
  }

  const work = await Work.findById(req.params.id);

  if (!work) {
    res.status(400);
    throw new Error("Work not found");
  }

  if (work.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizer");
  }

  // Traer solo algunos campos del perfil de la empresa
  const empProfile = await EmpProfile.findOne({
    user: req.user.id,
  }).select("tradeName companyName logo cover gallery web");

  res.status(200).json({
    ...work.toObject(),
    companyProfile: empProfile || null, // Agregar el perfil de la empresa});
  });
});

// @desc    create works
// @route   POST /api/works
// @access  Private
const createWorks = asyncHandler(async (req, res) => {
  const {
    title,
    jobCategory,
    workTime,
    workWay,
    experience,
    qualification,
    workPay,
    country,
    city,
    workPlace,
    description,
    contactMail,
    workFunctions,
    workRequire,
    iDate,
    fDate,
    actTime,
    workStatus,
    active,
  } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please add a title and description");
  }

  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Work not found");
  }

  const work = await Work.create({
    title,
    jobCategory,
    workTime,
    workWay,
    experience,
    qualification,
    workPay,
    country,
    city,
    workPlace,
    description,
    workFunctions,
    workRequire,
    contactMail,
    iDate,
    fDate,
    actTime,
    workStatus,
    active,
    location: workPlace + ", " + city + " - " + country,
    user: req.user.id,
  });

  res.status(201).json(work);
  console.log(work);
});

// @desc    Delete user works
// @route   DELETE /api/works/:id
// @access  Private
const deleteWork = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found or not conected");
  }
  console.log("controller: ", req.params.id);
  const work = await Work.findById(req.params.id);

  if (!work) {
    res.status(400);
    throw new Error("Work not found");
  }

  if (work.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizer");
  }

  await Work.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json({ success: true });
});

// @desc    Update user works
// @route   PUT /api/works/:id
// @access  Private
const updateWork = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found or not conected");
  }

  const work = await Work.findById(req.params.id);

  if (!work) {
    res.status(400);
    throw new Error("Work not found");
  }

  if (work.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizer");
  }

  const {
    title,
    jobCategory,
    workTime,
    workWay,
    experience,
    qualification,
    workPay,
    country,
    city,
    workPlace,
    description,
    workFunctions,
    workRequire,
    contactMail,
    iDate,
    fDate,
    actTime,
    workStatus,
    active,
  } = req.body;

  const updatedWork = await Work.findByIdAndUpdate(
    req.params.id,
    {
      title,
      jobCategory,
      workTime,
      workWay,
      experience,
      qualification,
      workPay,
      country,
      city,
      workPlace,
      description,
      workFunctions,
      workRequire,
      contactMail,
      iDate,
      fDate,
      actTime,
      workStatus,
      active,
      location: workPlace + ", " + city + " - " + country,
      user: req.user.id,
    },
    { new: true }
  );

  res.status(200).json(updatedWork);
});

// @desc    Get All works
// @route   GET /allworks/
// @access  Public

const getAllWorks = asyncHandler(async (req, res) => {
  const works = await Work.find();

  const worksWithEmpData = await Promise.all(
    works.map(async (item) => {
      const emp = await EmpProfile.findOne({ user: item.user });

      // Convertimos el item a objeto plano (para que no sea un documento de Mongoose si hace falta)
      const workObj = item.toObject();

      if (emp) {
        workObj.logo = emp.logo;
        workObj.tradeName = emp.tradeName;
        workObj.web = emp.web;
      }

      return workObj;
    })
  );

  res.status(200).json(worksWithEmpData);
});

// @desc    Get All works
// @route   GET /allworks/
// @access  Public

const getAllWorksPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchTerm =
      typeof req.query.search === "string" ? req.query.search : "";
    const locationTerm =
      typeof req.query.location === "string" ? req.query.location : "";
    const category =
      typeof req.query.category === "string" ? req.query.category : "";
    const sort =
      typeof req.query.sort === "string" ? req.query.sort : "Más reciente";

    const searchRegex = new RegExp(searchTerm, "i");
    const locationRegex = new RegExp(locationTerm, "i");

    const filter = {
      active: true,
      workStatus: "publicado",
    };

    if (searchTerm) {
      filter.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    if (locationTerm) {
      filter.location = locationRegex;
    }

    if (category) {
      filter.jobCategory = category;
    }

    let sortOption = {};
    if (sort === "Más reciente") {
      sortOption = { iDate: -1 };
    } else if (sort === "Mejor pagado") {
      sortOption = { workPay: -1 };
    }

    const total = await Work.countDocuments(filter);
    const works = await Work.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    // Aquí agregamos los datos del empleador a cada trabajo
    const worksWithEmpData = await Promise.all(
      works.map(async (item) => {
        const emp = await EmpProfile.findOne({ user: item.user });

        const workObj = item.toObject();

        if (emp) {
          workObj.logo = emp.logo;
          workObj.tradeName = emp.tradeName;
          workObj.web = emp.web;
        }

        return workObj;
      })
    );

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      total,
      data: worksWithEmpData,
      totalPages,
      page,
    });
  } catch (error) {
    console.error("Error getting paginated works:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user works
// @route   GET /allworks/:id
// @access  Public
const getPublicWork = asyncHandler(async (req, res) => {
  const work = await Work.findById(req.params.workId);

  if (!work) {
    res.status(400);
    throw new Error("Work not found");
  }

  // Traer solo algunos campos del perfil de la empresa
  const empProfile = await EmpProfile.findOne({
    user: work.user._id,
  }).select("tradeName companyName logo cover gallery web");

  res.status(200).json({
    ...work.toObject(),
    companyProfile: empProfile || null, // Agregar el perfil de la empresa});
  });

  res.status(200).json(work);
});

// @desc    Get works by employer ID
// @route   GET /api/employers/:userId/list?limit=5
// @access  Public or Private (según tu lógica)
const getWorksByEmployer = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const limit = parseInt(req.query.limit) || 5;

  // Verificar que el user existe y es employer
  const employer = await User.findById(userId);
  if (!employer) {
    res.status(404);
    throw new Error("Employer not found");
  }

  if (employer.profile !== "Employer") {
    res.status(400);
    throw new Error("User is not an employer");
  }

  // Buscar perfil del empleador una sola vez
  const empProfile = await EmpProfile.findOne({ user: userId });

  // Buscar trabajos y hacer populate del usuario
  const works = await Work.find({ user: userId })
    .populate("user", "name email") // puedes agregar más campos si lo deseas
    .sort({ createdAt: -1 })
    .limit(limit);

  // Agregar datos del perfil al trabajo (si existe)
  const worksWithEmpData = works.map((item) => {
    const workObj = item.toObject();
    if (empProfile) {
      workObj.logo = empProfile.logo;
      workObj.tradeName = empProfile.tradeName;
      workObj.web = empProfile.web;
    }
    return workObj;
  });

  res.status(200).json(worksWithEmpData);
});

module.exports = {
  getWorks,
  getWork,
  createWorks,
  updateWork,
  deleteWork,
  getAllWorks,
  getAllWorksPaginated,
  getPublicWork,
  getWorksByEmployer,
};
