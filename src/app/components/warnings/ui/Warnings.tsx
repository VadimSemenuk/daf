import { useLocalStorage } from "app/shared/hooks/useLocalStorage.tsx";
import styles from "app/App.module.css";
import Button from "app/shared/ui/button/Button.tsx";
import Close from "app/shared/ui/icons/Close.tsx";
import { useTranslation } from "react-i18next";

function Warnings() {
  const { t } = useTranslation();

  const [isBrowserWarningVisible, setIsBrowserWarningVisible] = useLocalStorage<boolean>(
    "BROWSER_WARNING",
    true,
  );
  const [isHeadphonesWarningVisible, setIsHeadphonesWarningVisible] = useLocalStorage<boolean>(
    "HEADPHONES_WARNING",
    true,
  );
  const [isMicWarningVisible, setIsMicWarningVisible] = useLocalStorage<boolean>(
    "MIC_WARNING",
    true,
  );
  const [isDelayWarningVisible, setIsDelayWarningVisible] = useLocalStorage<boolean>(
    "DELAY_WARNING",
    true,
  );

  const warnings = [
    {
      text: t("browserWarning"),
      isVisible: isBrowserWarningVisible && !(window as any)["chrome"],
      onClear: () => {
        setIsBrowserWarningVisible(false);
      },
    },
    {
      text: t("headphonesWarning"),
      isVisible: isHeadphonesWarningVisible,
      onClear: () => setIsHeadphonesWarningVisible(false),
    },
    {
      text: t("micWarning"),
      isVisible: isMicWarningVisible,
      onClear: () => setIsMicWarningVisible(false),
    },
    {
      text: t("delayWarning"),
      isVisible: isDelayWarningVisible,
      onClear: () => setIsDelayWarningVisible(false),
    },
  ];
  const visibleWarnings = warnings.filter((warning) => warning.isVisible);

  if (visibleWarnings.length === 0) {
    return null;
  }

  return (
    <>
      <div className={"divider"} />

      <div className={`${styles.warningsList}`}>
        {visibleWarnings.map((warning, index) => (
          <div
            key={index}
            className={styles.warningItem}
          >
            <div>{warning.text}</div>
            <Button
              sm={true}
              onClick={warning.onClear}
            >
              <Close />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Warnings;
