export const getHome = (req, res) => {
  try {
    res.status(200).json({
      message: 'Hello World !',
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message
    });
  }
};

export default {
  getHome
};
