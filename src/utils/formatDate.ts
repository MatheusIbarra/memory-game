import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

const formatDate = (date: string): string => {
    const today = format(parseISO(new Date().toISOString()), 'P', { locale: pt });
    const yesterday = format(parseISO(new Date(new Date().setDate(new Date().getDate()-1)).toISOString()), 'P', { locale: pt });
    const newdate = format(new Date(date) , 'P', { locale: pt });

    if (today === newdate) {
        return "Hoje";
    } else if (newdate === yesterday) {
        return "Ontem";
    } else {
        console.log(date)
        return date;
    }
}

export default formatDate;
