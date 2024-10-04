import React, { createContext, useState, useContext } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
});

export const SidebarProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
      <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
        {children}
      </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
export default SidebarContext;
