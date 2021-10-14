import styled from 'styled-components';
import userDefaultImage from '../../assets/userDefaultImage.png'

const ShowMembers = ({
	open,
	onClose,
    channelName,
    membersList
}) => {
	if (!open) return null;

	return (
		<Container>
			<Modal>
				<Header>
					<h2>#{channelName}</h2>
					<CloseIcon onClick={onClose}>
						<box-icon name='x' color='#686868'></box-icon>
					</CloseIcon>
				</Header>
				<MembersWrapper>
                    {/* {membersList.map((item, index) => (
                        <Member>

                        </Member>
                    ))} */}
                    <Member>
                        <span></span>
                    </Member>
                </MembersWrapper>
			</Modal>
		</Container>
	);
};

export default ShowMembers;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 25;
`;

const Modal = styled.div`
	position: fixed;
	background: white;
	width: 100%;
	max-width: 400px;
	height: 200px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	padding: 25px;
	box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.2);
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #1d1c1d;
	padding-left: 3px;
	padding-right: 3px;
`;
const CloseIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	width: 35px;
	height: 35px;

	:hover {
		background: #f6f6f6;
	}
`;
const MembersWrapper = styled.div`

`
const Member = styled.div`

`