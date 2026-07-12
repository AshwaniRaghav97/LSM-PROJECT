import PDFDocument from "pdfkit";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

export const downloadCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress || progress.percentage !== 100) {
      return res.status(400).json({
        success: false,
        message: "Complete the course to download certificate",
      });
    }

    const course = await Course.findById(courseId)
      .populate("instructor", "name")
      .populate("students", "name");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${course.title}-certificate.pdf`
    );

    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
    });

    doc.pipe(res);

    doc.rect(20, 20, 800, 550).stroke();

    doc
      .fontSize(34)
      .text("Certificate of Completion", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(22)
      .text("This Certificate is Proudly Presented To", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(30)
      .fillColor("blue")
      .text(req.user.name, {
        align: "center",
      });

    doc.fillColor("black");

    doc.moveDown(2);

    doc
      .fontSize(20)
      .text(
        `For successfully completing the course`,
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(26)
      .fillColor("green")
      .text(course.title, {
        align: "center",
      });

    doc.fillColor("black");

    doc.moveDown(3);

    doc.fontSize(16).text(
      `Instructor: ${course.instructor.name}`,
      80,
      470
    );

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      600,
      470
    );

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};