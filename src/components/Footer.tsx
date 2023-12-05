export default function Footer() {
  return (
    <footer data-testid="footer">
      <div className="container mx-auto max-w-screen-md">
        <div className="flex justify-between items-center py-4">
          <div className="text-sm">
            <p>
              Made with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              by{" "}
              <a
                className="text-blue-500 hover:text-blue-600"
                href="https://github.com/nguernse"
                target="_blank"
                rel="noopener noreferrer"
              >
                @nguernse
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
