import { errorHandler, sucessHandler } from '@/lib/functions';
import prisma from '@/lib/db';
import { UserStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { writeFileSync } from 'fs';

export const POST = async (req: Request) => {
    try {
        // Parse and extract form data
        const formData = await req.formData();
        const jData = formData.get('input');

        if (!jData || typeof jData !== 'string') {
            return errorHandler('Invalid input data', 400);
        }

        const data = JSON.parse(jData);
        const {
            author,
            title,
            date,
            report,
            type
        } = data;

        const file = formData.get('file');

        if (!title || !date || !author || !type) {
            return errorHandler('Please fill in all required fields.', 400);
        }

        if (!file && !report) {
            return errorHandler('Either a file or a report is required.', 400);
        }

        if (file && report) {
            return errorHandler('Either a file or a report is required but not both.', 400);
        }

        let uniqueFileName = null;

        // Validate image upload
        if ((file instanceof File)) {
            
            const validImageTypes = ['application/pdf'];
            if (!validImageTypes.includes(file.type)) {
                return errorHandler('Invalid file type.', 409);
            }

            if (file.size > 10 * 1024 * 1024) {
                // 3MB limit
                return errorHandler('File must not be more than 10MB.', 409);
            }

            // Generate unique filename and save image
            uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
            const savePath = path.join('/var/www/images.rccgshift.org', uniqueFileName);
            const buffer = new Uint8Array(await file.arrayBuffer()); // Convert to Uint8Array
            writeFileSync(savePath, buffer); // Write file using Uint8Array

        }

        const newReport = await prisma.reports.create({
            data: {
                name: title,
                date: new Date(date),
                report,
                type,
                file: file ? uniqueFileName : null,
                authorId: author,
            },
        });

        if (newReport) {
            return sucessHandler('Details added successfully.', 201);
        } else {
            return errorHandler('Something went wrong.', 500);
        }


    } catch (error) {
        console.error('Error adding new report:', error);
        return errorHandler('Something went wrong.', 500);
    }
};
