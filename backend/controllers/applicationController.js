const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");
const CanProfile = require("../models/canProfileModel");
const User = require("../models/userModel");
const Works = require("../models/workModel");

// @desc    create application
// @route   POST /api/application
// @access  Private
// Controlador para crear application
const createApplication = asyncHandler(async (req, res) => {
  const { workId } = req.body;

  if (!workId) {
    return res.status(400).json({ error: "Falta el ID del trabajo (workId)" });
  }

  if (req.user.profile !== "Candidate") {
    return res
      .status(403)
      .json({ error: "Solo candidatos pueden postularse." });
  }

  const alreadyApplied = await Application.findOne({
    user: req.user.id,
    workId,
  });

  if (alreadyApplied) {
    console.log({ error: "Ya te postulaste a este trabajo." });
    return res
      .status(400)
      .json({ message: "Ya te has postulado a este trabajo." });
  }

  const newApplication = await Application.create({
    user: req.user.id,
    workId,
  });

  res.status(201).json(newApplication);
});

// @desc    update application
// @route   PUT /api/application/item/:id
// @access  Private
// Update application controller
const updateApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "accepted", "rejected"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  const application = await Application.findById(id);

  if (!application) {
    return res.status(404).json({ error: "Postulación no encontrada" });
  }

  // Solo modificamos el estado (o lo que necesites)
  if (status) application.status = status;

  const updated = await application.save();
  res.json(updated);
});

// @desc    get application by id
// @route   GET /api/application/item/:id
// @access  Private
// Get application controller
const getApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id)
    .populate("user", "email") // Solo el email del User
    .populate("workId");

  if (!application) {
    return res.status(404).json({ error: "Postulación no encontrada" });
  }

  // Traer solo algunos campos del perfil del candidato
  const canProfile = await CanProfile.findOne({
    user: application.user._id,
  }).select("name lastName phone city profilePicture");

  res.json({
    ...application.toObject(),
    candidateProfile: canProfile || null,
  });
});

// @desc    delete application by id
// @route   DELETE /api/application/item/:id
// @access  Private
// Delete application controller
const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id);

  if (!application) {
    return res.status(404).json({ error: "Postulación no encontrada" });
  }

  await application.remove();
  res.json({ message: "Postulación eliminada correctamente" });
});

// @desc    Get my applications by User Id
// @route   GET /api/application/my
// @access  Private
// Get my applications controller
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user.id })
    .populate("workId") // Podés hacer .populate("workId", "title company location")
    .sort({ createdAt: -1 });

  if (applications.length === 0) {
    return res.status(404).json({ error: "No tienes postulaciones todavía." });
  }

  res.json(applications);
});

// @desc    Get applications by Work Id
// @route   GET /api/application/bywork/:workId
// @access  Private
// Get my applications controller
const getApplicationsByWork = asyncHandler(async (req, res) => {
  const { workId } = req.params;

  // Buscar todas las postulaciones al trabajo
  const applications = await Application.find({ workId })
    .populate("user", "email")
    .populate("workId", "title") // Obtenemos solo el email del usuario
    .sort({ createdAt: -1 });

  // Para cada postulación, buscamos el perfil asociado
  const applicationsWithProfiles = await Promise.all(
    applications.map(async (app) => {
      const profile = await CanProfile.findOne({ user: app.user._id }).select(
        "name lastName phone city profilePicture"
      );

      return {
        ...app.toObject(),
        candidateProfile: profile || null,
      };
    })
  );

  res.json(applicationsWithProfiles);
});

module.exports = {
  createApplication,
  updateApplication,
  getApplication,
  deleteApplication,
  getMyApplications,
  getApplicationsByWork,
};
