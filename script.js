function getGroupFromId(id) {
    if (id.includes("quiz")) return "quiz";
    if (id.includes("lab")) return "lab";
    return null;
}

function getContainerIdForGroup(group) {
    if (group === "quiz") return "quiz-terms";
    if (group === "lab") return "lab-terms";
    return null;
}

function openTerm(termId) {

    const group = getGroupFromId(termId);
    const containerId = getContainerIdForGroup(group);

    if (containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = "none";
        }
    }

    document.querySelectorAll(".term-content").forEach(function (content) {
        if (getGroupFromId(content.id) === group) {
            content.classList.remove("active");
        }
    });

    const selectedTerm = document.getElementById(termId);

    if (selectedTerm) {

        selectedTerm.classList.add("active");

        requestAnimationFrame(function () {
            selectedTerm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
}

function closeTerm(termId) {

    const selectedTerm = document.getElementById(termId);

    if (selectedTerm) {
        selectedTerm.classList.remove("active");
    }

    const group = getGroupFromId(termId);
    const containerId = getContainerIdForGroup(group);

    if (containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = "grid";
        }
    }
}

document.querySelectorAll('nav a[href^="#"]')
.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            document
                .querySelectorAll(".term-content")
                .forEach(function(content) {
                    content.classList.remove("active");
                });

            const quizTerms =
                document.getElementById("quiz-terms");

            if (quizTerms) {
                quizTerms.style.display = "grid";
            }

            const labTerms =
                document.getElementById("lab-terms");

            if (labTerms) {
                labTerms.style.display = "grid";
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
