import Link from "./Link";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-slate-100 flex justify-end p-3 text-slate-500"
    >
      <div>
        Made by{" "}
        <Link
          href="https://github.com/nguernse"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-800 no-underline"
        >
          @nguernse
        </Link>
      </div>
    </footer>
  );
}
