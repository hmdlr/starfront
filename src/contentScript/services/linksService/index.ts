import extractDomain from "extract-domain";

export const getInvalidPercentages = (): {
  invalidPercentage: number;
  trickyPercentage: number;
} => {
  const links = listLinksInPage();
  const invalidLinks = links.filter(link => link.malformed);
  const invalidPercentage = invalidLinks.length / links.length;
  const trickyLinks = links.filter(link => link.tricky);
  const trickyPercentage = trickyLinks.length / links.length;

  return {
    invalidPercentage,
    trickyPercentage
  };
};

interface Link {
  malformed: boolean;
  tricky: boolean;
}

const listLinksInPage = (): Link[] => {
  const links = document.getElementsByTagName("a");
  const linkList: Link[] = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute("href");
    if (href) {
      const malformed = href === "#";
      let tricky = false;

      // tricky if it redirects to a different page
      if (href.startsWith("/")) {
        tricky = false;
      } else {
        tricky = compareDomains(window.location.href, href);
      }

      linkList.push({
        malformed,
        tricky
      });
    }
  }
  return linkList;
};

const compareDomains = (currentDomain: string, href: string): boolean => {
  let tricky = false;

  try {
    const currentDomain = extractDomain(window.location.href, { tld: true });
    const hrefDomain = extractDomain(href, { tld: true });
    tricky = currentDomain !== hrefDomain;
  } catch (e) {
    tricky = true;
  }

  return tricky;
}
