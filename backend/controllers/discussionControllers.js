import DiscussionMaster from "../models/DiscussionMaster.js";
import DiscussionDetails from "../models/DiscussionDetails.js";

export const createDiscussion = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    if (!courseId || !title || !content)
      return res.status(400).json({ message: "All fields are required" });

    // Create DiscussionMaster
    const discussion = await DiscussionMaster.create({
      course: courseId,
      title,
    })
      .populate("course", "title")
      .populate({
        path: "details",
        populate: { path: "user", select: "name" },
      });

    // Create initial post in DiscussionDetail
    await DiscussionDetails.create({
      discussionMaster: discussion._id,
      user: req.user._id,
      content,
    });

    res
      .status(201)
      .json({ success: true, message: "Discussion created", discussion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllDiscussion = async (req, res) => {
  try {
    const { courseId, filter } = req.query;

    if (!courseId)
      return res.status(400).json({ message: "Course ID is required" });

    let discussions = await DiscussionMaster.find({
      course: courseId,
    }).populate({
      path: "course",
      select: "title",
    });

    // Sort by filter
    if (filter === "latest")
      discussions.sort((a, b) => b.createdAt - a.createdAt);
    else if (filter === "unanswered")
      discussions = discussions.filter((d) => d.details?.length === 0);
    else if (filter === "popular") {
      // Sort by number of replies
      discussions = discussions.sort(
        (a, b) => (b.details?.length || 0) - (a.details?.length || 0)
      );
    }

    res.status(200).json({ success: true, data: discussions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteDiscussion = async (req, res) => {
  try {
    await DiscussionMaster.findByIdAndDelete(req.params.id);
    await DiscussionDetails.deleteMany({ discussionMaster: req.params.id });
    res.status(200).json({ success: true, message: "Discussion deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4. Pin discussion
export const pinDiscussion = async (req, res) => {
  try {
    const discussion = await DiscussionMaster.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: "Not found" });
    discussion.pinned = !discussion.pinned;
    await discussion.save();
    res
      .status(200)
      .json({ success: true, message: "Discussion pinned/unpinned" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
