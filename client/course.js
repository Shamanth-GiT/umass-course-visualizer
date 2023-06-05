function extractCourseNames(sentence) {
    const pattern = /\b[A-Za-z]+\s+\d+\b/g;
    const courseNames = sentence.match(pattern);
    return courseNames;
}

const sentence = "I'm taking COMPSCI 311 and MATH 233 this semester. I am also taking CHEM 101!";
const courseNames = extractCourseNames(sentence);
console.log(courseNames);


//The python version worked, not sure about this.

