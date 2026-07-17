import PDFDocument from "pdfkit";
import QRCode from "qrcode";

import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";

// =========================================
// Download Certificate
// =========================================

export const downloadCertificate = async (req, res) => {
  try {

    const { courseId } = req.params;

    // Check Progress

    const progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress || progress.percentage !== 100) {
      return res.status(400).json({
        success: false,
        message:
          "Complete the course to download certificate",
      });
    }

    // Get Course

    const course = await Course.findById(courseId)
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // =========================================
    // Find Existing Certificate
    // =========================================

    let certificate = await Certificate.findOne({
      user: req.user._id,
      course: courseId,
    });

    // =========================================
    // Create Certificate If Not Exists
    // =========================================

    if (!certificate) {

      const certificateId =
        "CERT-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      certificate = await Certificate.create({
        certificateId,
        user: req.user._id,
        course: courseId,
      });

    }

    // QR Code aur PDF Part next message me add karenge...
        // =========================================
    // Verification URL
    // =========================================

    const verificationUrl =
      `${process.env.CLIENT_URL}/verify-certificate/${certificate.certificateId}`;

    // Generate QR Code

    const qrCode = await QRCode.toDataURL(verificationUrl);

    const qrImage = Buffer.from(
      qrCode.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );

    // =========================================
    // PDF Headers
    // =========================================

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${course.title}-certificate.pdf`
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 30,
    });

    doc.pipe(res);

    // Border

    doc.rect(20, 20, 800, 550).lineWidth(3).stroke();

    // Title

    doc
      .fontSize(34)
      .fillColor("#1E3A8A")
      .text("CERTIFICATE OF COMPLETION", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(20)
      .fillColor("black")
      .text(
        "This Certificate is Proudly Presented To",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(30)
      .fillColor("#2563EB")
      .text(req.user.name, {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(18)
      .fillColor("black")
      .text(
        "For successfully completing the course",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(26)
      .fillColor("#16A34A")
      .text(course.title, {
        align: "center",
      });

    doc.fillColor("black");

    doc.moveDown(3);

    // Instructor

    doc.fontSize(16).text(
      `Instructor : ${course.instructor.name}`,
      70,
      470
    );

    // Date

    doc.text(
      `Issued : ${new Date().toLocaleDateString()}`,
      580,
      470
    );

    // Certificate ID

    doc.fontSize(14).text(
      `Certificate ID : ${certificate.certificateId}`,
      70,
      505
    );

    // QR Code

    doc.image(qrImage, 640, 340, {
      width: 120,
    });
        // =========================================
    // Verification Text
    // =========================================

    doc
      .fontSize(12)
      .fillColor("gray")
      .text(
        "Scan the QR Code or visit the URL below to verify this certificate.",
        470,
        475,
        {
          width: 300,
          align: "center",
        }
      );

    doc
      .fontSize(10)
      .fillColor("blue")
      .text(
        verificationUrl,
        470,
        510,
        {
          width: 300,
          align: "center",
        }
      );

    // Finish PDF
    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({
      certificateId,
    })
      .populate("user", "name email")
      .populate("course", "title")
      .populate({
        path: "course",
        populate: {
          path: "instructor",
          select: "name",
        },
      });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};