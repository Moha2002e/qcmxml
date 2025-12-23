import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = path.resolve(__dirname, '../../qcm.txt');
const outputFile = path.resolve(__dirname, '../src/assets/questions.json');

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf-8');

// Split content into Questions and Answers sections
const [questionsPart, answersPart] = content.split('---');

// Parse Answers
const answersMap = {};
const answerLines = answersPart.match(/(\d+)\s*→\s*([a-d])/g);
if (answerLines) {
    answerLines.forEach(line => {
        const [_, num, ans] = line.match(/(\d+)\s*→\s*([a-d])/);
        answersMap[num] = ans;
    });
}
console.log('Parsed Answers:', answersMap);

// Parse Questions
const questions = [];
const questionRegex = /\*\*(\d+)\)\s*(.*?)\*\*\s*([\s\S]*?)(?=\*\*|$)/g;
let match;

while ((match = questionRegex.exec(questionsPart)) !== null) {
    const number = match[1];
    const text = match[2].trim();
    const optionsBlock = match[3].trim();

    const options = {};
    const optionRegex = /(\d+)\.\s*([a-d])\)\s*(.*)/g;
    let optMatch;
    while ((optMatch = optionRegex.exec(optionsBlock)) !== null) {
        options[optMatch[2]] = optMatch[3].trim();
    }

    if (answersMap[number]) {
        questions.push({
            id: parseInt(number),
            text: text,
            options: options,
            correctAnswer: answersMap[number]
        });
    }
}

console.log(`Parsed ${questions.length} questions.`);

fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2));
console.log(`Saved to ${outputFile}`);
