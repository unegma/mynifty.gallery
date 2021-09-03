import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injected, walletconnect } from "../helpers/connectors";
import { useEagerConnect, useInactiveListener } from "../helpers/hooks";
import getErrorMessage from "../helpers/getErrorMessage";
import { Spinner } from "./Spinner";
import { Button, Modal} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import DonateButton from "./DonateButton";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignContent: 'center'
    },
  }),
);

enum ConnectorNames {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect'
}

const connectorsByName: { [connectorName in ConnectorNames]: any} = {
  [ConnectorNames.Metamask]: injected,
  [ConnectorNames.WalletConnect]: walletconnect
}

export default function Web3ConnectionButtons() {
  const classes2 = useStyles2();
  const [modalStyle] = useState(getModalStyle);

  const [modalOpen, setModalOpen] = useState(false);
  const context = useWeb3React<Web3Provider>(); // todo check because this web3provider is from ethers
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const handleDisconnect = () => {
    if (connector === connectorsByName[ConnectorNames.WalletConnect]) {
      console.log('Deactivating WalletConnect session');
      (connector as any).close(); // todo unfinsihed
      deactivate();
    } else {
      deactivate();
    }
  }

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const showModal = () => {
    setModalOpen(true);
  }

  const hideModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={hideModal}
      >
        <div style={modalStyle} className={`modalBoxContainer ${classes2.paper}`} >

          {(!active && !error) && (
            <h2 className="modalTitle">Choose Connection Type</h2>
          )}

          {(active || error) && (
            <h2 className="modalTitle">Choose Action</h2>
          )}

          {!!error && <h4>{getErrorMessage(error)}</h4>}

          <div>
            {Object.keys(connectorsByName).map((name: any) => {
              const currentConnector = connectorsByName[name as keyof typeof ConnectorNames];
              const activating = currentConnector === activatingConnector;
              const connected = currentConnector === connector;
              const disabled = !triedEager || !!activatingConnector || connected || !!error;

              return (
                (!active && !error) && (
                  <div className="connectButtonContainer" key={name}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="connectTypeButton"
                      disabled={disabled}
                      key={name}
                      onClick={() => {
                        setActivatingConnector(currentConnector);
                        activate(connectorsByName[name as keyof typeof ConnectorNames]);
                      }}
                    >
                      <div>
                        {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                        {connected && (
                          <span role="img" aria-label="check">
                            ✅
                          </span>
                        )}
                      </div>
                      {name}
                    </Button>
                  </div>
                )
              )
            })}

            { !active &&
              <div className="youtube-link-container">
                <a target="_blank" href="https://www.youtube.com/watch?v=6h_liI6atEk">Learn how to set up a MetaMask wallet.</a>
              </div>
            }

          </div>
          <div className="mywallet-button-container">
            {(active) && (<></>
              // <Button variant="contained" color="primary" onClick={hideModal} component={Link} to="/wallet">
              //   Go To My Wallet
              // </Button>
            )}
            <br/>
            {/*<DonateButton />*/}
            <br/>
          </div>

        </div>
      </Modal>

      {(!active && !error) && (
        <Button variant="contained" color="secondary" className="connectButton" onClick={showModal}>
          Connect
        </Button>
      )}

      {(active || error) && (
        <>
          <div className="donateButton-container">
            {/*<DonateButton />*/}
          </div>
          <Button variant="contained" color="secondary" className="disconnectButton" onClick={() => {handleDisconnect()}}>
            Disconnect
          </Button>
        </>
      )}

      {/*{!!(library && account) && (*/}
      {/*  <button*/}
      {/*    style={{*/}
      {/*      height: '3rem',*/}
      {/*      borderRadius: '1rem',*/}
      {/*      cursor: 'pointer'*/}
      {/*    }}*/}
      {/*    onClick={() => {*/}
      {/*      library*/}
      {/*        .getSigner(account)*/}
      {/*        .signMessage('👋')*/}
      {/*        .then((signature: any) => {*/}
      {/*          window.alert(`Success!\n\n${signature}`)*/}
      {/*        })*/}
      {/*        .catch((error: any) => {*/}
      {/*          window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))*/}
      {/*        })*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Sign Message*/}
      {/*  </button>*/}
      {/*)}*/}

    </>
  )
}
