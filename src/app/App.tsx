import "./App.module.css";
import styles from "./App.module.css";
import { useState } from "react";
import Main from "./pages/main/ui/Main.tsx";
import type { Job } from "./entities/Job.ts";
import DAF from "app/pages/daf/ui/DAF.tsx";

function App() {
  const [job, setJob] = useState<Job | null>(null);

  const resetJob = () => setJob(null);

  return (
    <div className={styles.app}>
      <a
        href="https://www.logoadult.by/"
        target="_blank"
        className={styles.logo}
      >
        LOGO ADULT
      </a>

      {!job && <Main onStart={setJob} />}
      {job && (
        <DAF
          job={job}
          onStop={resetJob}
        />
      )}
    </div>
  );
}

export default App;
