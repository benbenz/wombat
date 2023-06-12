#include "MyClass.hpp"

using namespace MyLibrary;

MyClass::MyClass()
{
}

MyClass::~MyClass()
{
}

void MyClass::Create(const char* fullName)
{
    CDPComponent::Create(fullName);
}

void MyClass::CreateModel()
{
    CDPComponent::CreateModel();

    RegisterStateProcess("Null", (CDPCOMPONENT_STATEPROCESS)&MyClass::ProcessNull, "Initial Null state");
}

void MyClass::Configure(const char* componentXML)
{
    CDPComponent::Configure(componentXML);
}

void MyClass::ProcessNull()
{
}