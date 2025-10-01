import "./Main.module.css";
import logo from "/public/images/main.svg";
import styles from "./Main.module.css";
import { useState } from "react";
import Play from "app/shared/ui/icons/Play.tsx";
import type { Job } from "app/entities/Job.ts";
import Switch from "app/shared/ui/switch/Switch.tsx";
import Button from "app/shared/ui/button/Button.tsx";
import Time from "app/shared/ui/icons/Time.tsx";
import Word from "app/shared/ui/icons/Word.tsx";
import Input from "app/shared/ui/input/Input.tsx";

interface Props {
  onStart(job: Job): void;
}

function Main(props: Props) {
  const [job, setJob] = useState<Job>({});

  const [isWordsCountActivated, setIsWordsCountActivated] = useState(false);
  const [isTimeActivated, setIsTimeActivated] = useState(false);

  const onStartClick = () => {
    props.onStart(job);
  };

  return (
    <>
      <div className={`${styles.titleWrapper} container`}>
        <img
          src={logo}
          alt="logo"
        />

        <div className={styles.title}>DAF</div>
      </div>

      <div className={`${styles.warnWrapper} warn container`}>
        {!(window as any)["chrome"] && (
          <div>
            Для корректной работы рекомендуется использовать компьютер и браузер Google Chrome
          </div>
        )}
        <div>Используйте наушники для предотвращения эхо</div>
      </div>

      <div className={`${styles.jobSettings} container`}>
        <div className={styles.jobSettingWrapper}>
          <div className={styles.jobSetting}>
            <Word />
            <Switch
              label={"Завершить по достижению указанного количества слов"}
              checked={isWordsCountActivated}
              onCheckedChange={(value) => {
                setIsWordsCountActivated(value);
                if (!value) {
                  setJob({ ...job, wordsCount: undefined });
                }
              }}
            />
          </div>
          {isWordsCountActivated && (
            <Input
              type="number"
              placeholder="Слов до завершения"
              onChange={(e) => setJob({ ...job, wordsCount: +e.target.value })}
            />
          )}
        </div>

        <div className={styles.jobSettingWrapper}>
          <div className={styles.jobSetting}>
            <Time />
            <Switch
              label={"Завершить по достижению указанного количества времени"}
              checked={isTimeActivated}
              onCheckedChange={(value) => {
                setIsTimeActivated(value);
                if (!value) {
                  setJob({ ...job, durationSeconds: undefined });
                }
              }}
            />
          </div>
          {isTimeActivated && (
            <Input
              type="number"
              placeholder="Минут до завершения"
              onChange={(e) => setJob({ ...job, durationSeconds: +e.target.value * 60 })}
            />
          )}
        </div>
      </div>

      <Button onClick={onStartClick}>
        <Play />
      </Button>
    </>
  );
}

export default Main;
