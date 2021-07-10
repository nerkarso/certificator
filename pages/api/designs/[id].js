import withDatabase from '@/middlewares/withDatabase';
import DesignModel from '@/models/DesignModel';

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
 * /designs/{id}:
 *   get:
 *     tags:
 *     - Design
 *     summary: Get a design
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */

async function getOne(req, res) {
  try {
    const design = await DesignModel.findById(req.query.id);
    if (design) {
      res.json({ design });
    } else {
      res.status(404).json({
        error: true,
        message: 'Design does not exist',
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to get design',
      details: ex.message,
    });
  }
}

/**
 * @openapi
 * /designs/{id}:
 *   patch:
 *     tags:
 *     - Design
 *     summary: Update a design
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */
async function updateOne(req, res) {
  try {
    const design = await DesignModel.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (design) {
      res.json({ success: true });
    } else {
      res.status(404).json({
        error: true,
        message: 'Design does not exist',
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to update design',
      details: ex.message,
    });
  }
}
/**
 * @openapi
 * /designs/{id}:
 *   delete:
 *     tags:
 *     - Design
 *     summary: Delete a design
 *     parameters:
 *     - name: id
 *       in: path
 *     responses:
 *       200:
 *         description: Success
 */
async function deleteOne(req, res) {
  try {
    await DesignModel.deleteOne({ _id: req.query.id });
    res.json({ success: true });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to delete design',
      details: ex.message,
    });
  }
}
