// HTML elements for file input and chart display
const fileInput = document.getElementById("file-input");
const chartCanvas = document.getElementById("chart");

// Function to process the file
function processFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const text = event.target.result;

    // Analyze text to identify topics and frequencies
    const topicFrequencies = analyzeTopics(text);

    // Generate bar chart using Chart.js
    const chartData = {
      labels: Object.keys(topicFrequencies).sort(),
      datasets: [{
        label: "Topic Frequencies",
        data: Object.values(topicFrequencies),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const chart = new Chart(chartCanvas, {
      type: "bar",
      data: chartData,
      options: chartOptions
    });

    // TODO: Implement click event handling and question/summary display
  };

  reader.readAsText(file);
}

// Function to analyze text and extract topic frequencies
function analyzeTopics(text) {
  // Implement your topic identification and counting logic here
  // Example using simple word counting:
  const words = text.toLowerCase().split(/\W+/);
  const topicCounts = {};

  words.forEach(word => {
    topicCounts[word] = (topicCounts[word] || 0) + 1;
  });

  return topicCounts;
}
// Event listener for bar clicks
chartCanvas.onclick = function(event) {
  const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

  if (activePoints.length > 0) {
    const clickedIndex = activePoints[0].index;
    const clickedTopic = chartData.labels[clickedIndex];

    // Retrieve questions and summary for the clicked topic
    const topicData = getTopicData(clickedTopic);

    // Display the retrieved information
    // (using appropriate HTML elements and styling)
    const questionSummaryContainer = document.getElementById("question-summary");
    questionSummaryContainer.innerHTML = `
      <h2>Questions for ${clickedTopic}</h2>
      <ul>
        ${topicData.questions.map(question => `<li>${question}</li>`).join("")}
      </ul>
      <p>Summary: ${topicData.summary}</p>
    `;
  }
};

// Function to retrieve questions and summary for a given topic
function getTopicData(topic) {
  // Implement your logic to fetch topic data from source file or storage
  // Example using a simple data structure:
  const topicData = {
    // Replace with actual questions and summary for each topic
    "topic1": {
      questions: ["Question 1 for topic 1", "Question 2 for topic 1"],
      summary: "Summary for topic 1"
    },
    "topic2": {
      questions: ["Questions for topic 2"],
      summary: "Summary for topic 2"
    },
    // ...
  };

  return topicData[topic];
}

// Event listener for file selection
fileInput.addEventListener("change", processFile);