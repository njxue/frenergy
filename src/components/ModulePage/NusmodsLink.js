import { Image, Link, Tooltip } from "@chakra-ui/react";

function NusmodsLink(props) {
  const { moduleCode } = props;
  const link = `https://nusmods.com/modules/${moduleCode}/`;
  return (
    <Tooltip label="Go to NUSMODS">
      <Link href={link} isExternal>
        <Image
          boxSize="30px"
          src={require("../../static/nusmodslogo.png")}
          cursor="pointer"
        />
      </Link>
    </Tooltip>
  );
}

export default NusmodsLink;
