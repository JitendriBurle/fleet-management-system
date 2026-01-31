module.exports = (req, res) => {
    res.status(404).json({ message: 'This Request is not found.' });
};