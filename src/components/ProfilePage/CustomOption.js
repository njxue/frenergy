import { components } from "react-windowed-select";

function CustomOption(props) {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <div>
      <components.Option {...newProps}>{props.children}</components.Option>
    </div>
  );
}

export default CustomOption;
