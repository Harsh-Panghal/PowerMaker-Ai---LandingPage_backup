// Fetch terms data

fetch("terms.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("terms-container");

    // ✅ Render effectiveDate and intro body from the first object
    const firstItem = data[0];
    if (firstItem.effectiveDate) {
      const effectiveDate = document.createElement("p");
      effectiveDate.className = "text-sm text-gray-500 mb-2";
      effectiveDate.textContent = `Effective: ${firstItem.effectiveDate}`;
      container.appendChild(effectiveDate);
    }

    if (firstItem.body) {
      const intro = document.createElement("p");
      intro.className =
        "text-[14px] md:text-[16px] font-[400] text-[#656262] mb-4";
      intro.innerHTML = firstItem.body.replace(/\n/g, "<br>");
      container.appendChild(intro);
    }

    // ✅ Loop starts from index 1 to skip the effectiveDate section
    for (let i = 1; i < data.length; i++) {
      const section = data[i];

      const title = document.createElement("h2");
      title.className =
        "text-[18px] md:text-[22px] font-semibold text-[#000000] leading-[110%]";
      title.textContent = section.title;

      title.id = section.title
        .toLowerCase()
        .replace(/^\d+\.?\s*/, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

      const body = document.createElement("p");
      body.className =
        "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[130%] md:leading-[110%] mt-[0.5rem]";
      body.innerHTML = section.body?.replace(/\n/g, "<br>") || "";

      container.appendChild(title);
      container.appendChild(body);

      if (section.list && Array.isArray(section.list)) {
        const ul = document.createElement("ul");
        ul.className =
          "list-disc ml-[55px] mt-[10px] text-[14px] md:text-[16px] font-[400] text-[#656262]";
        section.list.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }

      container.appendChild(document.createElement("br"));
    }
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

// toggle menu
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("absolute", "z-50", "top-0", "left-0"); // for mobile overlay
  } else {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("absolute", "z-50", "top-0", "left-0");
  }
}
//if user click on any link in mobile view then close the menu
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  });
});
