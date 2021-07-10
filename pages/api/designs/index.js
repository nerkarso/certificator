import withDatabase from '@/middlewares/withDatabase';
import DesignModel from '@/models/DesignModel';

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
 * /designs:
 *   get:
 *     tags:
 *     - Design
 *     summary: Get all designs
 */
async function getAll(req, res) {
  try {
    const designs = await DesignModel.find().sort({ title: 1 });
    res.json({ designs });
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
 * /designs:
 *   post:
 *     tags:
 *     - Design
 *     summary: Create a design
 */
async function createOne(req, res) {
  try {
    await DesignModel.create(req.body);
    res.status(201).json({ success: true });
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Failed to create design',
      details: ex.message,
    });
  }
}
