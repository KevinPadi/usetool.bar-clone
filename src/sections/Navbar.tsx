import { motion } from "motion/react";
import Button from "../components/Button";
import logo from "/src/assets/logo.svg";

const Navbar = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: " -100%" }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.4 } }}
      className="fixed z-50 top-0 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 py-7 px-8 "
    >
      <div className="hidden sm:block"></div>
      <div className="place-self-center">
        <img src={logo} alt="Logo" className="size-9" />
      </div>
      <nav className="hidden md:block place-self-end">
        <ul className="flex gap-2">
          <li>
            <Button variant="ghost">Log In</Button>
          </li>
          <li>
            <Button variant="secondary">Register</Button>
          </li>
        </ul>
      </nav>
    </motion.section>
  );
};

export default Navbar;
