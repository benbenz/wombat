import { useState } from "react";

const Tab = ({ children, activeTab, label, onClick }) => {
  let className = "tab";

  if (activeTab === label) {
    className += " tab-active";
  }

  return (
    <a className={className} onClick={onClick}>{children}</a>
  );
};

const Tabs = ({ children }) => {

  if (typeof children === "undefined" || children.length === 0) {
      return (
          <div className="tabs"></div>
      )
  }
  if(! Array.isArray(children)) 
      children = [children]
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      {children.map( (child) => {
        return (
          <Tab
            activeTab={activeTab}
            key={child.props.label}
            label={child.props.label}
            onClick={() => onClickTabItem(child.props.label)}
          >
            {child.props.label}
          </Tab>
        );
      })}
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs ;