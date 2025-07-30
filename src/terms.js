// Fetch terms data

fetch("terms.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("terms-container");

    data.forEach((section) => {
      const title = document.createElement("h2");
      title.className =
        "text-[22px] font-semibold text-[#000000] leading-[110%]";
      title.textContent = section.title;

      // Generate an ID based on the title
      title.id = section.title
        .toLowerCase()
        .replace(/^\d+\.?\s*/, "") // remove leading numbers and optional dot+space
        .replace(/\s+/g, "-") // spaces to dashes
        .replace(/[^a-z0-9\-]/g, ""); // remove non-alphanumeric except dashes

      const body = document.createElement("p");
      body.className =
        "text-[16px] font-[400] text-[#656262] leading-[110%] mt-[0.5rem]";
      body.innerHTML = section.body.replace(/\n/g, "<br>");

      container.appendChild(title);
      container.appendChild(body);

      if (section.list && Array.isArray(section.list)) {
        const ul = document.createElement("ul");
        ul.className =
          "list-disc ml-[55px] mt-[10px] text-[16px] font-[400] text-[#656262]";
        section.list.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }

      container.appendChild(document.createElement("br"));
    });
  });

// Add active class to the clicked link
const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("text-[#1FA2D0]"));
      links.forEach((l) => l.classList.add("text-[#828282]"));

      link.classList.remove("text-[#828282]");
      link.classList.add("text-[#1FA2D0]");
    });
  });
