import withDatabase from '@/middlewares/withDatabase';
import PresetModel from '@/models/PresetModel';

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getOne(req, res);
    case 'PATCH':
      return updateOne(req, res);
    case 'DELETE':
      return deleteOne(req, res);
  }
}

export default withDatabase(handler);

/**
 * @openapi
 * /presets/{id}:
 *   get:
 *     tags:
 *     - Preset
 *     summary: Get a preset
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */
async function getOne(req, res) {
  try {
    const preset = await PresetModel.findById(req.query.id);
    if (preset) {
      res.json({ preset });
    } else {
      res.status(404).json({
        error: true,
        message: 'Preset does not exist',
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to get preset',
      details: ex.message,
    });
  }
}

/**
 * @openapi
 * /presets/{id}:
 *   patch:
 *     tags:
 *     - Preset
 *     summary: Update a preset
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */
async function updateOne(req, res) {
  try {
    const preset = await PresetModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (preset) {
      res.json({ success: true });
    } else {
      res.status(404).json({
        error: true,
        message: 'Preset does not exist',
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to update preset',
      details: ex.message,
    });
  }
}

/**
 * @openapi
 * /presets/{id}:
 *   delete:
 *     tags:
 *     - Preset
 *     summary: Delete a preset
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */
async function deleteOne(req, res) {
  try {
    await PresetModel.deleteOne({ _id: req.query.id });
    res.json({ success: true });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to delete preset',
      details: ex.message,
    });
  }
}
