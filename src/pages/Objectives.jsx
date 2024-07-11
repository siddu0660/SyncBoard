import Todo from "../components/todo"
function Objectives({ isDarkMode }) {
  return (
    <Todo isDarkMode={!isDarkMode}/>
  );
}
export default Objectives;
