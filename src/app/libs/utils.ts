export const scrollToId = (id: string, offset: number = 24) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function scrollTo(
  target: string,
  scrollContainer: string = "html",
  offset: number = 0
) {
  const container = document.querySelector(
    scrollContainer || "html"
  ) as HTMLElement;
  const element = document.querySelector(target) as HTMLElement;

  if (!container || !element) return;
  container.scrollTo({
    top: element.offsetTop - container.offsetTop,
    behavior: "smooth",
  });
}
