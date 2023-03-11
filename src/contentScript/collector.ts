import { initCollectible } from "../redux/reducers/collectedReducer";
import { countDomainSymbols, isHostIp, isShortenedUrl } from "./services/urlService";
import { hasSsl } from "./services/sslService";
import { getInvalidPercentages } from "./services/linksService";
import { calculateTotalImageSpacePercentage } from "./services/imagesService";
import env from "../env";
import { Invoker } from "src/common/models";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { isPunycode } from "./services/urlService/punycode";

export const getServerCache = async (invoker: Invoker) => {
  const response = await invoker.invoke({
    url: `${env.api[Microservice.Scanphish]}/api/cache/ping`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }
  });
  console.log(response);
  return response;
};

export const collect = () => {
  // url info
  const collectible = initCollectible();

  const host = window.location.hostname;
  // count the number of numbers and symbols in host
  const urlSymbols = countDomainSymbols(host);
  // check if url is an IP address
  const isIP = isHostIp(host);
  // check if url is shortened
  const shortened = isShortenedUrl(document.URL);
  // check if url is punycode
  const punycodeUrl = isPunycode(host);
  // todo: similarity to other urls

  // ssl info
  const sslExists = hasSsl(document.URL);

  // links info
  const invalidPercentages = getInvalidPercentages();

  // todo: favicon

  // image space info
  const totalImageSpacePercentage = calculateTotalImageSpacePercentage();

  // update collectible
  collectible.url.symbols = urlSymbols;
  collectible.url.isIP = isIP;
  collectible.url.shortened = shortened;
  collectible.ssl.has = sslExists;
  collectible.links.invalidPercentage = invalidPercentages.invalidPercentage;
  collectible.links.trickyPercentage = invalidPercentages.trickyPercentage;
  collectible.totalImageSpace = totalImageSpacePercentage;

  return collectible;
};
