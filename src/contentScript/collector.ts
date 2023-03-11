import { initCollectible } from "../redux/reducers/collectedReducer";
import { countUrlSymbols, isHostIp, isShortenedUrl } from "./services/urlService";
import { hasSsl } from "./services/sslService";
import { getInvalidPercentages } from "./services/linksService";
import { calculateTotalImageSpacePercentage } from "./services/imagesService";
import { Invoker } from "../invoker";
import env from "../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";

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
};

export const collect = () => {
  // url info
  const collectible = initCollectible();

  const host = window.location.host;
  // count the number of numbers and symbols in host
  const urlSymbols = countUrlSymbols(document.URL);
  // check if url is an IP address
  const isIP = isHostIp(host);
  // check if url is shortened
  const shortened = isShortenedUrl(document.URL);
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
