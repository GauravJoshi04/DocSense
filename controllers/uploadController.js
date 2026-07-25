import { ingestDocument} from "../services/ingestionService.js";
import fs from "fs/promises";

export const uploadDocument = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No PDF uploaded."
        });
    }

    const filePath = req.file.path;

    try {

        const stats = await ingestDocument(filePath);

        // Cleanup (don't fail the request if cleanup fails)
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.warn("Failed to delete uploaded file:", err.message);
        }

        return res.json({
            success: true,
            message: "Document ingested successfully",
            fileName: req.file.originalname,
            stats
        });

    } catch (err) {

        console.error(err);

        // Optional: cleanup even if ingestion fails
        try {
            await fs.unlink(filePath);
        } catch {}

        return res.status(500).json({
            success: false,
            message: "Upload failed!"
        });
    }
};