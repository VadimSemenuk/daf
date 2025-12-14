import styles from "./Help.module.css";
import { Dialog } from "app/shared/ui/dialog/Dialog";
import Button from "app/shared/ui/button/Button.tsx";
import Question from "app/shared/ui/icons/Question.tsx";
import { useTranslation } from "react-i18next";

function Help() {
  const { t } = useTranslation();

  return (
    <Dialog
      trigger={
        <Button
          sm={true}
          filled={true}
        >
          <Question />
          <span>{t("help")}</span>
        </Button>
      }
      title={t("helpAndSupport")}
      content={
        <>
          <div className={styles.item}>
            <div className={styles.title}>{t("delay")}</div>
            <div className={styles.content}>{t("delayHelp")}</div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>{t("noSound")}</div>
            <div className={styles.content}>{t("noSoundHelp")}</div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>{t("support")}</div>
            <div className={styles.content}>
              <a
                href="https://t.me/VadimSemenyuk/"
                target="_blank"
              >
                t.me/VadimSemenyuk
              </a>
              <br />
              <a href="mailto:mamindeveloper@gmail.com">mamindeveloper@gmail.com</a>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.title}>{t("consulting")}</div>
            <div className={styles.content}>
              <a
                href="https://logoadult.by/"
                target="_blank"
              >
                logoadult.by
              </a>
            </div>
          </div>
        </>
      }
    />
  );
}

export { Help };
