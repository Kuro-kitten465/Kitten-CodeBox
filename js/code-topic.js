document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".sidebar ul li a");
    const contentContainer = document.querySelector(".content");

    // Fetch the JSON file
    fetch("https://kuro-kitten465.github.io/Kitten-CodeBox/data/c-sharp.json")
        .then(response => response.json())
        .then(data => {
            // Function to display the selected topic with multiple descriptions and code blocks
            function showTopic(topicKey) {
                const topicData = data[topicKey];

                if (topicData) {
                    // Clear previous content
                    contentContainer.innerHTML = "";

                    // Create a new section element
                    const section = document.createElement("section");
                    section.id = topicKey;

                    // Add title
                    const title = document.createElement("h2");
                    title.textContent = topicData.title;
                    section.appendChild(title);

                    // Loop through the content array and display each block
                    topicData.content.forEach(block => {
                        // Add description
                        const description = document.createElement("p");
                        description.textContent = block.description;
                        section.appendChild(description);

                        // Add code block if present
                        if (block.code) {
                            const codeBlock = document.createElement("pre");
                            const code = document.createElement("code");
                            code.textContent = block.code;
                            codeBlock.appendChild(code);
                            section.appendChild(codeBlock);
                        }
                    });

                    // Append the section to the content container
                    contentContainer.appendChild(section);
                }
            }

            // Attach click event to sidebar links
            links.forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const topicKey = this.getAttribute("data-target");
                    showTopic(topicKey); // Show the selected topic
                });
            });

            const sections = document.querySelectorAll(".content section");

            // Function to hide all sections
            function hideAllSections() {
                sections.forEach(section => {
                    section.classList.remove("active");
                });
            }

            // Function to show the clicked section
            function showSection(targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add("active");
                }
            }

            // Attach click event to all sidebar links
            links.forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const targetId = this.getAttribute("data-target");

                    // Hide all sections and show the clicked one
                    hideAllSections();
                    showSection(targetId);
                });
            });

            // Optionally, show the first topic by default
            //hideAllSections();
            showSection("introduction"); // Show the introduction section initially
        })
        .catch(error => console.error("Kuro_kitten Error fetching JSON:", error));
});
