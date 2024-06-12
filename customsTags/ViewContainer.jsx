import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";

const Div = styled.View`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #ebeef2;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ViewContainer = ({ children }) => {
  return (
    <SafeAreaView>
      <Div>{children}</Div>
    </SafeAreaView>
  );
};
