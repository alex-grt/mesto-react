function Footer() {
  const year = new Date();

  return (
    <footer className="footer page__footer">
      <p className="footer__copyright" lang="en">
        &copy; {year.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
