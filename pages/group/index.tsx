import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Autocomplete,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Input,
} from "@mui/material";

// @ts-ignore
import contract_abi = require("../../public/contract_abi.json");
import { useContractRead, useContractWrite } from "wagmi";

const statusList = [
  { name: "等待项目启动", value: 0 },
  { name: "白名单轮", value: 3 },
  { name: "公开发售", value: 1 },
  { name: "发售结束", value: 2 },
];

export default function SimpleContainer() {
  const [status, setStatus] = React.useState<number | null>(
    statusList[0].value,
  );

  const [airdropList, setAirdropList] = React.useState<string>("");

  const [allowList, setAllowList] = React.useState<string>("");

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: contract_abi,
    functionName: "totalSupply",
    onSuccess(data) {
      console.log("totalSupply:", data);
    },
  });

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: contract_abi,
    functionName: "status",
    onSuccess(data: any) {
      console.log("status:", data);
      setStatus(data);
    },
  });

  const {
    data,
    write: writeChangeStatus,
    error,
    isError,
    isSuccess,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: contract_abi,
    functionName: "setStatus",
  });

  const {
    data: airdropData,
    write: writeAirdrop,
    error: airdropError,
    isError: airdropIsError,
    isSuccess: airdropSuccess,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: contract_abi,
    functionName: "airdrop",
  });

  const handleChangeStatus = async (event: { target: { value: any } }) => {
    let {
      target: { value },
    } = event;
    setStatus(value);
  };

  const handleSetStatus = async () => {
    writeChangeStatus({ args: [status] });
  };

  const handleAirdrop = async () => {
    const value = JSON.parse(airdropList);
    console.log("value", value);
  };

  const handleGenerateAllowList = async () => {
    const value = JSON.parse(airdropList);
    console.log("value", value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 5 }}>
          <ConnectButton />
        </Box>
        <Box display="flex" gap="20px" sx={{ marginTop: 5, width: 800 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">当前状态</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="status"
              onChange={handleChangeStatus}
            >
              {statusList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleSetStatus}>
            修改
          </Button>
        </Box>

        {status === statusList[2].value && (
          <Box
            display="flex"
            alignItems="center"
            gap="20px"
            sx={{ marginTop: 5, width: 800 }}
          >
            <TextField
              id="outlined-multiline-static"
              label="空投钱包地址列表"
              multiline
              rows={4}
              defaultValue=""
              fullWidth={true}
              value={airdropList}
              onChange={(event) => {
                setAirdropList(event.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={handleAirdrop}
              sx={{ height: 50 }}
            >
              空投
            </Button>
          </Box>
        )}

        {status === statusList[1].value && (
          <Box
            display="flex"
            alignItems="center"
            gap="20px"
            sx={{ marginTop: 5, width: 800 }}
          >
            <TextField
              id="outlined-multiline-static"
              label="白名单"
              multiline
              rows={4}
              defaultValue=""
              fullWidth={true}
              value={allowList}
              onChange={(event) => {
                setAllowList(event.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={handleGenerateAllowList}
              sx={{ height: 50, width: 120 }}
            >
              制作&上传白名单
            </Button>
          </Box>
        )}

        {status === statusList[2].value && (
          <Box
            display="flex"
            alignItems="center"
            gap="20px"
            sx={{ marginTop: 5, width: 800 }}
          >
            <Box marginRight="10px">
              <Box
                textAlign={{ xs: "left", sm: "right" }}
                sx={{
                  fontWeight: "bold",
                  color: "#101828",
                }}
              >
                {"已经正式发售,快来玩吧！"}
              </Box>
            </Box>
            <Button variant="outlined">Mint</Button>
          </Box>
        )}

        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          sx={{ marginTop: 5, width: 800 }}
        >
          <Box
            textAlign={{ xs: "left", sm: "right" }}
            sx={{
              fontWeight: "bold",
              color: "#101828",
            }}
          >
            {"项目已发售完!"}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
