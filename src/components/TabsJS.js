import { useState } from "react";

const Tab = ({ children, activeTab, label, onClick }) => {
  let className = "tab tab-bordered";

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

  const sizeClass = "size" + children.length ;

  return (
    <div className={"tabs "+sizeClass}>
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
      <div className="w-full">
        <div className="tab-content">
          {children.map((child) => {
            const theClassName = child.props.label === activeTab ? 'tab-display active' : 'tab-display';
            return (
              <div className={theClassName} key={'c'+child.props.label}>
                {child.props.children}
              </div>
            ) ;
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs ;