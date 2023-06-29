import {
  generatePdf as generatePdfService,
  generateChartImage,
} from '../../config/index.js';

export const generateReport = async ({ labels, dataSet, title }) => {
  try {
    const chartImage = await generateChartImage({ dataSet, labels });
    const generatePdf = await generatePdfService({ chartImage, title });

    return generatePdf;
  } catch (error) {
    throw new Error('Erro generate report');
  }
};
