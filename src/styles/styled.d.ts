import "styled-componets/native";

declare module "styled-components/native" {
    export interface DefaultTheme {
        /** nome do tema */ name: string;
        /** vermelho */ primary: string;
        /** cinza */ secundary: string;
        /** verde */ tertiary: string;
        /** amarelo */ quaternary: string;
        /** gradiente vermelho */ buttonPrimary: string[];
        /** gradiente cinza */ buttonSecundary: string[];
        /** gradiente verde */ buttonTertiary: string[];
        /** gradiente amarelo */ buttonQuaternary: string[];
        card: string;
        menu: string;
        /** vermelho escuro */ background: string;
        /** opacidade 30% */ opacity30: string;
        /** opacidade 60% */ opacity60: string;
        /** opacidade 90% */ opacity90: string;
        /** vermelho escuro */ placeholder: string;
        /** branco */ text: string;
        /** preto */ textDark: string;
        /** open sans */ font: string;
        /** open sans bold */ fontTitle: string;
        /** oswald bold */ fontMenu: string;
        /** oswald */ fontButton: string;
        /** branco */ text: string;
        /** cinza */ info: string;
        /** verde */ success: string;
        /** vermelho */ error: string;
        /** amarelo */ warn: string;
    }
}
