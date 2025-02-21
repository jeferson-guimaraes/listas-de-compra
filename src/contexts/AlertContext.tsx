import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo do contexto
interface AlertContextType {
  showAlert: (title: string, message: string) => void;
  closeAlert: () => void;
  isVisible: boolean;
  title: string;
  message: string;
}

// Cria o contexto com o tipo definido
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Hook para usar o contexto
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert deve ser usado dentro de um AlertProvider');
  }
  return context;
};

// Provedor do contexto de alerta
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Função para abrir o alerta
  const showAlert = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setIsVisible(true);
  };

  // Função para fechar o alerta
  const closeAlert = () => {
    setIsVisible(false);
    setTitle('');
    setMessage('');
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert, isVisible, title, message }}>
      {children}
    </AlertContext.Provider>
  );
};
