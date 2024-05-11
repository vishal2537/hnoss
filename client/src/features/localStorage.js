export const setSidebarOpen = (isOpen) => {
  localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
};

export const getSidebarOpen = () => {
  const sidebarOpen = localStorage.getItem("sidebarOpen");
  return sidebarOpen ? JSON.parse(sidebarOpen) : true;
};
