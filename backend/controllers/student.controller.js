exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, contactEmail } = req.body;
    // TODO (Person 3): Get studentId from verified token (req.user.id)

    // TODO (Person 1): Replace with DB update: await User.findByIdAndUpdate(studentId, { firstName, lastName, contactEmail });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
