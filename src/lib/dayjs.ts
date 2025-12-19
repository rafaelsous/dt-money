import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";

dayjs.extend(timezone);
dayjs.locale("pt-br");
dayjs.tz.setDefault("America/Sao_Paulo");

export { dayjs };
