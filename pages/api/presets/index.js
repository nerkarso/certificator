import withDatabase from '@/middlewares/withDatabase';
import PresetModel from '@/models/PresetModel';

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getAll(req, res);
    case 'POST':
      return createOne(req, res);
  }
}

export default withDatabase(handler);

/**
 * @openapi
 * /presets:
 *   get:
 *     tags:
 *     - Preset
 *     summary: Get all presets
 */
async function getAll(req, res) {
  try {
    const presets = await PresetModel.find().sort({ title: 1 });
    res.json({ presets });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to get presets',
      details: ex.message,
    });
  }
}

/**
 * @openapi
 * /presets:
 *   post:
 *     tags:
 *     - Preset
 *     summary: Create a preset
 */
async function createOne(req, res) {
  try {
    await PresetModel.create(req.body);
    res.status(201).json({ success: true });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to create preset',
      details: ex.message,
    });
  }
}
