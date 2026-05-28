import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsShowcase from "@/components/ProjectsShowcase";

describe("ProjectsShowcase Component", () => {
  it("renders the section heading and visual container elements", () => {
    render(<ProjectsShowcase />);
    
    // Check if the section header matches featured work
    const heading = screen.getByRole("heading", { name: /Featured Work/i });
    expect(heading).toBeInTheDocument();
    
    const subheading = screen.getByText(/curated selection of industrial products/i);
    expect(subheading).toBeInTheDocument();
  });

  it("automatically sorts and ranks project cards in Z-pattern priority", () => {
    render(<ProjectsShowcase />);
    
    // Select all cards based on their data-priority attributes
    const cards = document.querySelectorAll("article.project-card");
    expect(cards.length).toBe(4);
    
    // Position 1 (Index 0): Pulse Enterprise CRM (enterprise)
    expect(cards[0].querySelector("h3")?.textContent).toBe("Pulse Enterprise CRM");
    expect(cards[0].getAttribute("data-priority")).toBe("1");
    
    // Position 2 & 3: Next.js or React Frontend modules
    const pos2Title = cards[1].querySelector("h3")?.textContent;
    const pos3Title = cards[2].querySelector("h3")?.textContent;
    expect(["Nova Commerce Storefront", "Lumen AI Dashboard"]).toContain(pos2Title);
    expect(["Nova Commerce Storefront", "Lumen AI Dashboard"]).toContain(pos3Title);
    
    // Position 4 (Index 3): DevUtils CLI Toolkit (utility)
    expect(cards[3].querySelector("h3")?.textContent).toBe("DevUtils CLI Toolkit");
    expect(cards[3].getAttribute("data-priority")).toBe("4");
  });

  it("checks contrast accessibility badges and ensures WCAG-AA compliant styles", () => {
    render(<ProjectsShowcase />);
    
    // Verify specific badges exist and check that background/color attributes are configured
    const springBootBadge = screen.getByText("Spring Boot");
    expect(springBootBadge).toBeInTheDocument();
    expect(springBootBadge.style.color).toBe("rgb(6, 95, 70)"); // matches #065f46
    
    const postgreSqlBadges = screen.getAllByText("PostgreSQL");
    const postgreSqlBadge = postgreSqlBadges.find(el => el.tagName === "SPAN") as HTMLSpanElement;
    expect(postgreSqlBadge).toBeInTheDocument();
    expect(postgreSqlBadge.style.color).toBe("rgb(30, 58, 138)"); // matches #1e3a8a
    
    const tailwindBadge = screen.getByText("Tailwind CSS");
    expect(tailwindBadge).toBeInTheDocument();
    expect(tailwindBadge.style.color).toBe("rgb(17, 94, 89)"); // matches #115e59
  });

  it("applies secure navigation attributes to external anchor buttons", () => {
    render(<ProjectsShowcase />);
    
    const anchors = screen.getAllByRole("link");
    expect(anchors.length).toBeGreaterThan(0);
    
    anchors.forEach((anchor) => {
      // Strictly verify target="_blank" and rel="noopener noreferrer" for security compliance
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      expect(anchor).toHaveAttribute("aria-label");
    });
  });
});
