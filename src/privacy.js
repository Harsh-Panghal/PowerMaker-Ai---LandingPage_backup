fetch("privacy.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("privacyPolicy-container");

    // Render Effective Date
    if (data.effectiveDate) {
      const effectiveDate = document.createElement("p");
      effectiveDate.className = "text-sm text-gray-500 mb-[10px]";
      effectiveDate.textContent = `Effective: ${data.effectiveDate}`;
      container.appendChild(effectiveDate);
    }

    // Render Intro
    if (data.intro) {
      const intro = document.createElement("p");
      intro.className =
        "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[130%] md:leading-[110%] mb-[1.5rem]";
      intro.textContent = data.intro;
      container.appendChild(intro);
    }

    // Loop through each section
    data.sections.forEach((section) => {
      // Section Title
      const title = document.createElement("h2");
      title.className =
        "text-[18px] md:text-[20px] font-semibold text-[#000000] leading-[110%] mt-[0.5rem] md:mt-[1rem]";
      title.textContent = section.title;
      title.id = section.title
        .toLowerCase()
        .replace(/^\d+\.?\s*/, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      container.appendChild(title);

      // Section Intro
      if (section.intro) {
        const sectionIntro = document.createElement("p");
        sectionIntro.className =
          "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[0.5rem]";
        sectionIntro.textContent = section.intro;
        container.appendChild(sectionIntro);
      }

      // ✅ Sub Intro (render if present)
      if (section["sub-intro"]) {
        const subIntro = document.createElement("p");
        subIntro.className =
          "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[1.5rem]";
        subIntro.textContent = section["sub-intro"];
        container.appendChild(subIntro);
      }

      // Content as object (nested groups)
      if (
        section.content &&
        typeof section.content === "object" &&
        !Array.isArray(section.content)
      ) {
        Object.entries(section.content).forEach(([groupTitle, values]) => {
          const subTitle = document.createElement("h3");
          subTitle.className = "text-[16px] md:text-[17px] font-semibold mt-[1rem]";
          subTitle.textContent = groupTitle
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
          container.appendChild(subTitle);

          const ul = document.createElement("ul");
          ul.className =
            "list-disc ml-[55px] mt-[10px] text-[14px] md:text-[16px] font-[400] text-[#656262]";
          Object.entries(values).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${key
              .replace(/([A-Z])/g, " $1")
              .trim()}:</strong> ${value}`;
            ul.appendChild(li);
          });
          container.appendChild(ul);
        });
      }

      // Render uses / rights / list arrays
      const listItems = section.uses || section.rights || section.list;
      if (Array.isArray(listItems)) {
        const ul = document.createElement("ul");
        ul.className =
          "list-disc ml-[55px] mt-[10px] text-[14px] md:text-[16px] font-[400] text-[#656262]";
        listItems.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = item;

          ul.appendChild(li);
        });
        container.appendChild(ul);
      }

      // ✅ Content as string (after list rendering)
      if (typeof section.content === "string") {
        const p = document.createElement("p");
        p.className =
          "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[0.5rem]";
        p.innerHTML = section.content.replace(/\n/g, "<br>");
        container.appendChild(p);
      }

      // Contact info (string)
      if (typeof section.contact === "string") {
        const contact = document.createElement("p");
        contact.textContent = `Contact: ${section.contact}`;
        contact.className =
          "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[10px]";
        container.appendChild(contact);
      }

      // Contact info (object)
      if (typeof section.contact === "object") {
        if (section.contact.email) {
          const email = document.createElement("p");
          email.textContent = `Email: ${section.contact.email}`;
          email.className =
            "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[5px]";
          container.appendChild(email);
        }
        if (section.contact.address) {
          const address = document.createElement("p");
          address.textContent = `Address: ${section.contact.address}`;
          address.className =
            "text-[14px] md:text-[16px] font-[400] text-[#656262] leading-[110%] mt-[5px]";
          container.appendChild(address);
        }
      }

      // Line break after section
      container.appendChild(document.createElement("br"));
    });
  })
  .catch((error) => {
    console.error("Error loading privacy policy:", error);
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

